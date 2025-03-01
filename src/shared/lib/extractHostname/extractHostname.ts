export const ExtractHostname = (url: string, tld?: boolean) => {
  let hostname;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf('://') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];

  //find & remove "?"
  hostname = hostname.split('?')[0];

  if (tld) {
    const hostnames = hostname.split('.');
    hostname = hostnames[hostnames.length - 2] + '.' + hostnames[hostnames.length - 1];
  }

  return hostname;
};
