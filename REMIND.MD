［静态文件发布］
工具：rsd
参考：https://github.com/fouber/static-resource-digest




－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
ERP前端发布：
1. 执行脚本 publishyc.sh
2. 在服务器ychtml目录下svn up
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
FILE：publishyc.sh

# Static Resource Publish Shell
# Linvo 2016/2/19

# 1.rebuild
cd /usr/local/var/www/rshtml
rm -rf ../ychtml
rsd release -omd ../ychtml

# 2. svn commit
cd ../ychtml
svn st | awk '{if ($1 == "?") {print $2} }' | xargs svn add
svn st | awk '{if ($1 == "!") {print $2}}' | xargs svn rm
svn commit -m "$1"
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－





－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
微信商城前端发布：
1. 执行脚本 publishwx.sh
2. 在服务器dist目录下svn up
注意：发布时要通过参数区分环境，然后在具体环境的服务器上拉代码
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
FILE：publishwx.sh

# Static Resource Publish Shell
# Linvo 2016/5/4

# 1.rebuild
cd /usr/local/var/www/app/phone/wx-customer/src
rm -rf ../dist
if [[ $1 = '--prod' ]]; then
    echo 'ENV: P'
    rsd release -omd ../dist -c
elif [[ $1 = '--b2b' ]]; then
    echo 'ENV: B2B@T'
    rsd release -omd ../dist -f fis-conf-b2b.js -D -c
elif [[ $1 = '--b2c' ]]; then
    echo 'ENV: B2C@T'
    rsd release -omd ../dist -f fis-conf-b2c.js -D -c
else
    echo '\nOption Error:\n'
    echo '\t--prod: production environment'
    echo '\t--b2b: test environment with B2B'
    echo '\t--b2c: test environment with B2C'
    echo '\n'
    exit
fi

# 2. svn commit
cd ../dist
svn st | awk '{if ($1 == "?") {print $2} }' | xargs svn add
svn st | awk '{if ($1 == "!") {print $2}}' | xargs svn rm
svn commit -m "publish via rsd"
－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－



