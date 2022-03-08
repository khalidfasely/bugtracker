# How to use!
1. Copy the repo to your machine.
2. Make sure you have Python and Django and NodeJs installed on your system. If not you will need to install them.
3. Install yarn on your machine.
4. Go to the frontend folder
```shell
cd frontend
```
and run these commands:
```shell
yarn install
```
```shell
yarn run build
```
5. Go back to the project folder and run 
```shell
python manage.py runserver
```

### Note:

Every time you made a change on the React side of the project you need to run:
```shell
npm run build
```
to create new build/ folder.