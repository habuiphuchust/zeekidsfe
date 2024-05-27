export default {
    api: {
        root: 'http://192.168.56.102:8080/api/logs/',
        login: "http://192.168.56.102:8080/api/login",
        register: "http://192.168.56.102:8080/api/register",
        myinfo: "http://192.168.56.102:8080/api/myinfo",
        connlog: 'http://192.168.56.102:8080/api/conn.log',
        modbuslog: 'http://192.168.56.102:8080/api/modbus.log',
        configText: 'http://192.168.56.102:8080/api/get-config/MyConfig.zeek',
        configJson: 'http://192.168.56.102:8080/api/get-config/MyConfig.json',
        config2: 'http://192.168.56.102:8080/api/get-config/__load__.zeek',
        editconfig: 'http://192.168.56.102:8080/api/edit-config/Myconfig.zeek',
        editconfig2: 'http://192.168.56.102:8080/api/edit-config/__load__.zeek',
        defaultconfig: 'http://192.168.56.102:8080/api/MyConfig.zeek',
        defaultconfig2: 'http://192.168.56.102:8080/api/__load__.zeek',
        checkZeekStatus: 'http://192.168.56.102:8080/api/check-zeekids',
        stopZeek: 'http://192.168.56.102:8080/api/stop-zeekids',
        startZeek: 'http://192.168.56.102:8080/api/start-zeekids',
        time: 'http://192.168.56.102:8080/api/epoch-time',
    }
}