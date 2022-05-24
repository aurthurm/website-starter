export const environment = {
  production: true,
  BACKEND_API_URL: ['196.27.127.58', 'mhealth.nmrl'].some(val => window.location.hostname.includes(val)) ? 'http://196.27.127.58:4000' : 
                    window.location.hostname.includes("192.168.0.40") ? 'http://192.168.0.40:8080' : 
                    window.location.hostname.includes("localhost") ? 'http://localhost:5000' : 'http://192.168.0.185:5000'
};