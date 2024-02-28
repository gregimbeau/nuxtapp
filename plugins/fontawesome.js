import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faYoutube} from "@fortawesome/free-brands-svg-icons";
import { faTelegram} from "@fortawesome/free-brands-svg-icons";


config.autoAddCss = false;

library.add(faFacebook, faInstagram, faXTwitter, faYoutube, faTelegram);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon, {});
});