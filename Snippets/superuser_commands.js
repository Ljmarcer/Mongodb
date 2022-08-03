// View users inside the database
"use db_name"  
"show users" // admin user / superused wont be returned since its the same for all databases


// view roles in the database
db.getRole('user')
db.getUser('user')
// OR
db.getRoles()
db.getUsers()

// Grant or revoke Permissions to users as superusers
db.grantRolesToUser("user", [{role: "readWrite", db: "db_name"}])
db.revokeRolesFromUser("user", [{role: "readWrite", db: "db_name"}])

// create / drop  user , user can have different priviledges based on 
db.createUser(
    {
      user: "tester",
      pwd: "password",
      roles: [
         { role: "read", db: "test1" },
         { role: "read", db: "test2" },
         { role: "read", db: "test3" },
         { role: "readWrite", db: "test" }
      ]
    }
)
db.dropUser('user')
db.dropAllUsers()

// see active operations or cursors, cursor is no more than the api request made by mongo to get the info
db.currentOp() // you can only execute this command as a superuser, only with root priviledges

