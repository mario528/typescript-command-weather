import commader from 'commander'
const command =  commader.version('1.0.0')
                         .option("-c, --city", "input search city")
                         .parse(process.argv)