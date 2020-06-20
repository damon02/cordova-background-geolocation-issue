import BackgroundGeolocation, { Location } from 'cordova-background-geolocation-lt'
import React from 'react'

interface IState {
  currentLocation: null | Location
  executedEvents: string[]
}

export default class App extends React.PureComponent<{}, IState> {
  constructor(props: {}) {
    super(props)
    this.state = { 
      currentLocation: null,
      executedEvents: [] 
    }
  }

  componentDidMount() {
    // Listen to pause and resume events, upon event execution save event name and time to state for displaying
    // and proval of concept. This can be removed and the problem still occurs
    document.addEventListener('pause', () => this.logEventToState('Pause'), false)
    document.addEventListener('resume', () => this.logEventToState('Resume'), false)

    if (BackgroundGeolocation) {
      console.log('LocationWatcher mounts')
      
      // Initialize the library
      // Without this, pause and resume will act like any normal cordova app
      this.setupGeoLocationPlugin()
      
      document.addEventListener('pause', () => this.onPauseApp(), false)
      document.addEventListener('resume', () => this.onResumeApp(), false)
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="location">
          <b>Location</b>
          <span>Lat: {this.state.currentLocation?.coords.latitude}</span>  
          <span>Lon: {this.state.currentLocation?.coords.longitude}</span>  
          <span>Course: {this.state.currentLocation?.coords.heading}</span>  
          <span>Speed: {this.state.currentLocation?.coords.speed}</span>  
        </div>
        <span>Events</span>
        <div className="events">
          {this.state.executedEvents.map((a, i) => <div className="row" key={i}>{a}</div>)}
        </div>
      </div>
    )
  }

  public logEventToState(event: string) {
    this.setState({ executedEvents: [`${event} at ${new Date()}`].concat(this.state.executedEvents) })
  }

  public setupGeoLocationPlugin = () => {
    if (BackgroundGeolocation) {
      BackgroundGeolocation.onLocation((location) => this.onLocationSuccess(location), (error) => console.error('[onLocation] ERROR: ', JSON.stringify(error)))
      BackgroundGeolocation.ready({})
    }
  }

  public onLocationSuccess = (geolocation: Location) => {
    this.setState({ currentLocation: geolocation })
  }

  public onPauseApp = async () => {
    if (BackgroundGeolocation) {
      await BackgroundGeolocation.stop().then(() => console.log('Stopped BackgroundLocation plugin'))
    }
  }

  public onResumeApp = async () => {
    if (BackgroundGeolocation) {
      await BackgroundGeolocation.start().then(() => console.log('Started BackgroundLocation plugin'))
    }
  }
}