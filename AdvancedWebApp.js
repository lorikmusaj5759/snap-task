/*
   File: AdvancedWebApp.js
   Description: A sophisticated and elaborate web application that demonstrates various advanced concepts in JavaScript and front-end development.
*/

// Import required modules and libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Chart from 'chart.js';
import { gsap, TweenMax, TimelineLite } from 'gsap';

// Define global variables
let userData = null;
let chartData = null;
let animationTimeline = null;

// Initialize the web application
function initApp() {
   // Display a loading spinner while fetching user data
   showLoadingSpinner();

   // Fetch user data from the server
   axios.get('/api/userdata').then(response => {
      userData = response.data;

      // Fetch chart data from the server
      axios.get('/api/chartdata').then(response => {
         chartData = response.data;

         // Render the main React component
         renderApp();
      });
   })
   .catch(error => {
      // Handle API errors
      console.error('Error fetching data:', error);
      showErrorPage();
   });
}

// Render the React application
function renderApp() {
   // Set up routing
   ReactDOM.render(
      <Router>
         <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
         </Switch>
      </Router>,
      document.getElementById('root')
   );
}

// Define the Home component
class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         welcomeMessage: 'Welcome to our advanced web application!'
      };
   }

   componentDidMount() {
      // Animate the welcome message
      animationTimeline = new TimelineLite();
      animationTimeline.fromTo('.welcome-message', 1, { opacity: 0 }, { opacity: 1 });
   }

   componentWillUnmount() {
      // Kill the animation timeline to avoid memory leaks
      animationTimeline.kill();
   }

   render() {
      return (
         <div className="home-page">
            <h1 className="welcome-message">{this.state.welcomeMessage}</h1>
         </div>
      );
   }
}

// Define the Dashboard component
class Dashboard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: userData.username,
         chartLabels: [],
         chartData: []
      };
   }

   componentDidMount() {
      // Generate chart data
      const labels = chartData.map(dataPoint => moment(dataPoint.date).format('MMM D'));
      const data = chartData.map(dataPoint => dataPoint.value);

      // Update state with chart data
      this.setState({
         chartLabels: labels,
         chartData: data
      });

      // Create and render the chart
      const chartCanvas = document.getElementById('chart');
      const chartContext = chartCanvas.getContext('2d');
      new Chart(chartContext, {
         type: 'line',
         data: {
            labels: labels,
            datasets: [
               {
                  label: 'Chart Data',
                  data: data,
                  lineTension: 0,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 2
               }
            ]
         },
         options: {
            responsive: true,
            maintainAspectRatio: false
         }
      });
   }

   render() {
      return (
         <div className="dashboard-page">
            <h2>Welcome, {this.state.username}!</h2>
            <canvas id="chart" className="chart"></canvas>
         </div>
      );
   }
}

// Define the NotFound component
function NotFound() {
   return (
      <div className="not-found-page">
         <h1>404 - Page Not Found</h1>
      </div>
   );
}

// Display a loading spinner while the app is initializing
function showLoadingSpinner() {
   const loadingSpinner = document.createElement('div');
   loadingSpinner.className = 'loading-spinner';
   document.body.appendChild(loadingSpinner);
   ReactDOM.render(<Spinner />, loadingSpinner);
}

// Display an error page in case of API errors
function showErrorPage() {
   ReactDOM.render(<ErrorPage />, document.getElementById('root'));
}

// Define the Spinner component
function Spinner() {
   return (
      <div className="spinner">
         <div className="spinner-icon"></div>
         <p>Loading...</p>
      </div>
   );
}

// Define the ErrorPage component
function ErrorPage() {
   return (
      <div className="error-page">
         <h1>Error!</h1>
         <p>An error occurred while fetching data. Please try again later.</p>
      </div>
   );
}

// Initialize the web application
initApp();
