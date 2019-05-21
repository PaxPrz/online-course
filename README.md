# Online course transaction using Hyperledger composer.

I have used hyperledger composer in order to record the transaction of buying courses from teachers.

## Getting Started

### Prerequisites and Installing

Things you need to install in order for making the system work.
1. nodejs [(https://nodejs.org/en/download/) or (apt-get install nodejs)]
2. npm [(https://www.npmjs.com/get-npm) or (apt-get install npm)]
3. docker [(https://docs.docker.com/install/)]
4. docker-compose [(https://docs.docker.com/compose/install/)]
5. hyperledger-composer [(npm install -g composer-cli@0.20)]
6. composer-rest-server [(npm install -g composer-rest-server@0.20)]
7. generator-hyperledger-composer [(npm install -g generator-hyperledger-composer@0.20)]
8. yeoman [(npm install -g yo)]

Note: Do not use sudo command or su while installing from npm. This may cause user authority issues while running the program.

## Running the environment

Make sure all the Prerequisites are installed on your PC. You can skip step i. & ii. for deploying hyperledger on online playground: https://composer-playground.mybluemix.net

### i. Running hyperledger-fabric in docker

We now need to create peers for hyperledger using docker. In order to do that we need to run fabric-script.
Clone this repository: https://github.com/hyperledger/composer-tools/tree/master/packages/fabric-dev-servers

Before downloading the necessary images for fabric. Make sure docker services are activated.

```for_linux$ /usr/sbin/service docker start```

Check if fabric images are available or not:

```$ docker images```

### ii. Setting up fabric environment

if not available, download fabric from the fabric-dev-servers

```$ export FABRIC_VERSION=hlfv12```
```$ ./downloadFabric.sh```

Then run the fabric

```$ ./startFabric.sh```

You can check if your docker container have started or not by:

```$ docker ps```

If you have not created PeerAdminCard create by running script

```$ ./createPeerAdminCard.sh```

If card is successfully created, you will see *PeerAdmin@hlfv1* card while running `$ composer card list`

### iii. Deploying the code on hyperledger

Note: The following script may differ according to composer version. I have used composer v0.20. If any problem occurs in any command then use --help option to see valid arguments. eg. composer network install --help

We will start by creating a bna file of the code. Every time you modify the code, increment the version in package.json file as necessary. Then use the command below to create .bna file

```$ composer archive create -t dir -n .```

On succeed, you will see a .bna file having filename containing its version number. If you want to deploy this on online-playground. You can deploy and test from there too.

Now install the composer network using PeerAdmin@hlfv1 card and .bna file

`$ composer network install --card PeerAdmin@hlfv1 --archiveFile online-course@0.0.1.bna`

After successful installation, now start the network by providing all necessary admin details and creating network admin card.

```$ composer network start --networkName online-course --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret password --card PeerAdmin@hlfv1 --file networkadmin.card```

Note: version mismatch can cause error, please verify the correct version

Now import the networkAdmin.card to composer

```$ composer card import --file networkadmin.card```

You will now find a new admin card for your hyperledger. You can view it by:

```$ composer card list```

Check if the network admin is connected properly

```$ composer card ping --card admin@online-course```

### iv. Using composer-rest-server

If everything is successful till now, then you can interact with hyperledger through composer-rest-server

```$ composer-rest-server```

> provide card name: admin@online-course

> Provide all the values to its default (just press enter enter enter...)

Then run the rest-server on localhost provided on the terminal.

### v. Creating an angular application

If you want to create an anglular app for this project. Use

```$ yo hyperledger-composer```

> select angular-app

> select default for all

This will download all necessary node modules for generating angular-app. The app will use composer-rest-server to connect to hyperledger. Make sure composer-rest-server is activated at desired port number.

### vi. Updating a version

You may want to modify the app slightly and deploy it every time a small modification is done. In order to do that, increment the version in package.json file and then create the new bna file using 1st command from step iii. Then upgrade the network using following command:

```$ composer network upgrade -c PeerAdmin@hlfv1 -n online-course -V 0.0.2```

This upgrade command is different according to composer version. Check composer network --help for further help.

### vii. Issuing a new ID

After you have created new participants in the network. Each participants can be provided with their own card.
From command line

```$ composer identity issue -c admin@online-course -f cardname.card -u Username -a "resource:com.pax.onlinecourse.Teacher#teacher@email.com"```

Then import the card to composer

```$ composer card import -f cardname.card```

Now you can again use composer-rest-server for getting access to hyperledger using that ID

```$ composer-rest-server -c cardname@online-course -p 3030 -n never -u true -w true```



# Some Guides while using Angular app

In list enter in format. 

eg: skills= ["java", "python"]


In course enter: course=[] //Initialize as empty list


Assign Relations through their email id

