# Configuration
## IP Binding 
in case you want your mongo to be accessed by any ip address:
To bind to all IPv4 addresses, you can specify the bind ip address of 0.0.0.0. in the config file to bind to all IPv4 and IPv6 addresses, you can specify the bind ip address of ::,0.0.0.0 or alternatively, use the new net.bindIpAll setting or the new command-line option --bind_ip_all.
## Authorization
- Step1: start in .conf with *authorization* disabled
- Step2: create an user in admin database like this:
```javascript
use admin
db.createUser(
  {
    user: "admin",
    pwd: "password",
    roles: [ { role: "root", db: "admin" } ]
  }
);
```
- Step3: start in.conf with *authorization* enabled and either authenticate in the mongocall with -u "admin" -pwd "password" --authenticationDatabase admin+
or inside the mongo shell with:
```javascript
use admin
db.auth('admin','password')
```
- Step4: creates user in the desired database with the desired permissions:
```javascript
use test
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
);
```
## Multiple Mongo instances
now sometimes we may want more than one mongo instance running in our machine if we have distributed space into 2 disks or more. There's no need for heavy operations here,
we just need to create a new config file specifing a new port and a new data location, we would just call mongo and specify the coonfiguration file location:

```bash
mongod -f <route to config file> 
```
### *Config file*
```conf
# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /home/mongodb/log/mongod.log 

# Where and how to store data.
storage:
  dbPath: /home/mongodb/data #Path to the new mongo instance
  journal:
    enabled: true
#  engine:
#  wiredTiger:

# how the process runs
processManagement:
  fork: true  # fork and run in background
  pidFilePath: /home/mongodb/mongod.pid  # location of pidfile
  timeZoneInfo: /usr/share/zoneinfo

# network interfaces
net:
  port: 27018      # different tcp port to form the connection
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.


security:
  authorization: "enabled"
  ```

