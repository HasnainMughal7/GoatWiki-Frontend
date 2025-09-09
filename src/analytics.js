import ReactGA from 'react-ga4';

export const initGA = (Mid) => {
  ReactGA.initialize(Mid ? Mid : '')
}

export const logPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page })
}