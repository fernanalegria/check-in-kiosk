# drchrono Hackathon

This project has been built taking into account the following guidelines:

### Doctor Dashboard

Imagine you’re a busy doctor running a lean medical practice. Your receptionist doesn’t have time to print out your daily schedule, 
or bother you with constant updates as patients check in, schedule new appointments, or cancel. 
You want to replace old office workflows with an interactive dashboard.

After you log into to the system, the doctor should see an interactive page page they can leave open that displays today’s appointments, 
indicating which patients are scheduled, which patients have checked in, and how long they have been waiting. From this screen, the doctor 
can indicate they are seeing a patient, which stops the “time spent waiting” clock. It should be able to update when an appointment status 
changes or a new appointment is scheduled by the receptionist or patient. It should also display some summary statistics, 
like the overall average wait time for all patients they have ever seen.

Outside of these base requirements, we hope you are able to develop any features you think make sense. Put yourself in the shoes of the doctor. 
What tools would be useful if you were planning your day? We love to see creativity and initiative!


Outside of these base requirements, you are free to develop any features you think
make sense.

To begin, fork the drchrono API project repo at https://github.com/drchrono/api-example-django

Use the drchrono API docs and feel free to reach out to the people operations team with any questions and we'll get back
to you ASAP.


### Check-in kiosk

Before reading this please read the prompt for Doctor Dashboard, as we will be building on top of that.

Here we add a sign-in kiosk, similar to the ones you see for flight check-ins.
There should be an account association flow where a doctor can authenticate using
their drchrono account and set up the kiosk for their office.
After the doctor is logged in, a page should be displayed that lets patients check
in. A patient with an appointment should first confirm their identity (first/last
name maybe SSN) then be able to update their demographic information using the
patient chart API endpoint.  Once the they have filled out that information the
app can set the appointment status to "Arrived" (Appointment API Docs).


### Requirements
- a free [drchrono.com](https://www.drchrono.com/sign-up/) account
- [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/docs/install/), which will help you install the node modules, i.e., our frontend dependencies
- [Python 3.7](https://www.python.org/downloads/). The backend service is built on Django, a popular Python web framework.


#### API token 
The first thing to do is get an API token from drchrono.com, and connect this local application to it!

This project has `social-auth` preconfigured for you. The `social_auth_drchrono/` contains a custom provider for
[Python Social Auth](http://python-social-auth.readthedocs.io/en/latest/) that handles OAUTH through drchrono. It should
 require only minimal configuration and tweaking. 

1) Log in to [drchrono.com](https://www.drchrono.com)
2) Go to the [API management page](https://app.drchrono.com/api-management/)
3) Make a new application
4) Set the environment variables `SOCIAL_AUTH_CLIENT_ID` and `SOCIAL_AUTH_SECRET` with the provided values.
5) Set your redirect URI to `http://localhost:8080/complete/drchrono/`


### Dev environment Setup

``` 
$ git clone https://github.com/fernanalegria/check-in-kiosk.git
$ cd check-in-kiosk
$ yarn install
$ yarn run start
$ py -m venv env
$ env\Scripts\activate
$ pip install -r requirements.txt
$ py manage.py runserver 8080
$ Connect with a browser to http://localhost:8080/setup/ and select the app you want to log in
```
NOTE: The instructions above have been tested on Windows 10, these may differ slightly with the ones you should
execute to get up and running in your operating system

This project uses PostgresSQL, a back-end relational database, hosted on Heroku. If you want to test it with your one
data, I recommend creating your own database and make and run Django migrations on it. If you decide to do so, you will
have to pre-populate the master tables state and city.

Once the dev server is running, connect with a browser to [http://localhost:8080/setup/]() and select the app you want to
log in. You should see two options: the Doctor Dashboard and the Check-in Kiosk.
