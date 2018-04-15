module.exports = function(grunt){
    grunt.initConfig({
        watch:{
            jade:{
                files:["views/**"],
                options:{
                    livereload: true
                }
            },
            js:{
                files:["public/js/**","models/**/*.js","schemas/**/*.js"],
                //tasks:["jshint"],
                options:{
                    livereload: true
                }
            }
        },
        nodemon:{
            dev:{  //开发环境
                options:{
                    file:"app.js",
                    args:[],
                    ignoredFiles:["README.md","node_modules/**",".DS_Store"],
                    watchedExtensions:["js"],
                    watchedFolders:["app","config"],
                    debug:true,
                    delayTime:1,
                    env:{
                        PORT:3000
                    },
                    cwd:__dirname
                }
            }
        },
        concurrent:{  //可以重新执行tasks中的2个任务
            tasks:["nodemon","watch"],
            optins:{
                logNoncurrentOutput:true
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");

    //避免因为语法问题停止整个grunt的执行
    grunt.option("force",true);
    grunt.registerTask("default",["concurrent"]);
}