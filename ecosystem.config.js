const qa = {
    "APP_PORT": 3000,
    "NODE_ENV": "qa",
    "MONGO_URL" : "mongodb://127.0.0.1:27017/testDB?retryWrites=true&w=majority",
    "SUPERSECRET": "TodoLIST@45wbt",
};
  
 
module.exports = {
    apps: [
      {
        name: "todo-list",
        script: 'server.js',
        autorestart: true,
        watch: true,
        exec_mode: 'cluster',
        instances: 1,
        env_qa: qa,
      }
    ]
}