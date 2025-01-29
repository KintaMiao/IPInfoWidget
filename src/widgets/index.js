import IPInfo from "./ipinfo/component";
import ipinfoWidget from "./ipinfo/widget";

export default {
  ipinfo: {
    component: IPInfo,
    widget: ipinfoWidget,
    api: "https://api.ipify.org",
    options: {
      secondaryApi: "http://ip-api.com/",
    },
  },
}; 