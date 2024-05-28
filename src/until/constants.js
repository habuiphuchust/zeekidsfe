const host = 'http://192.168.56.1:8080';
export default {
    api: {
        root: `${host}/api/logs/`,
        login: `${host}/api/login`,
        register: `${host}/api/register`,
        myinfo: `${host}/api/myinfo`,
        connlog: `${host}/api/conn.log`,
        modbuslog: `${host}/api/modbus.log`,
        configText: `${host}/api/get-config/MyConfig.zeek`,
        configJson: `${host}/api/get-config/MyConfig.json`,
        config2: `${host}/api/get-config/__load__.zeek`,
        editconfig: `${host}/api/edit-config/Myconfig.zeek`,
        editconfig2: `${host}/api/edit-config/__load__.zeek`,
        defaultconfig: `${host}/api/MyConfig.zeek`,
        defaultconfig2: `${host}/api/__load__.zeek`,
        checkZeekStatus: `${host}/api/check-zeekids`,
        stopZeek: `${host}/api/stop-zeekids`,
        startZeek: `${host}/api/start-zeekids`,
        time: `${host}/api/epoch-time`,
        deleteUser: `${host}/api/users/delete/`,
        changePassword: `${host}/api/change-password`,
        users: `${host}/api/users`,
    }
}