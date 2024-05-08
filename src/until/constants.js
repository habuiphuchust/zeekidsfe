export default {
    api: {
        root: 'http://192.168.56.102:8080/api/',
        login: "http://192.168.56.102:8080/api/login",
        register: "http://192.168.56.102:8080/api/register",
        myinfo: "http://192.168.56.102:8080/api/myinfo",
        connlog: 'http://192.168.56.102:8080/api/conn.log',
        modbuslog: 'http://192.168.56.102:8080/api/modbus.log',
        config: 'http://192.168.56.102:8080/api/get-config',
        editconfig: 'http://192.168.56.102:8080/api/edit-config',
        defaultconfig: 'http://192.168.56.102:8080/api/MyConfig.zeek',
        checkZeekStatus: 'http://192.168.56.102:8080/api/check-zeekids',
        stopZeek: 'http://192.168.56.102:8080/api/stop-zeekids',
        startZeek: 'http://192.168.56.102:8080/api/start-zeekids'
    }
}