const app = Vue.createApp({
    data() {
        return {
           
        } 
    }
});
app.component('nav-bar', {
    data() {
        return {
            navBar: {
                "home": {
                    // Bootstrap Icon
                    iconClass: "bi bi-house-fill",
                    link: "testhomepage.html",
                    title: "Home",
                    isActive: true
                },
                "about": {
                    iconClass: "bi bi-info-circle-fill",
                    link: "about.html",
                    title: "About",
                    isActive: false
                },
                "report": {
                    iconClass: "bi bi-file-earmark-person",
                    link: "report.html",
                    title: "Report",
                    isActive: false
                },
                "logout": {
                    iconClass: "bi bi-box-arrow-left",
                    link: "connect.html",
                    title: "Logout",
                    isActive: false
                }
            }
        }
    },
    template: `
        <!-- Navbar -->
        <div id="navApp">
            <nav class="nav flex-column bg-dark col" id="navbar">
                <div class="d-flex align-self-center">
                    <img src="images/homepage/icon.svg" id="icon"> 
                    <h2 id="logo" class="text-white" style="font-size: 2.2vw;">Personalify</h2>
                </div>
                <div v-for="nav in navBar" class="d-flex justify-content-start align-items-center">
                    <i :class="nav.iconClass"> </i>
                    <a class="nav-link" :class="nav.isActive ? 'active' : ''" :href="nav.link">
                        {{nav.title}}
                    </a>
                </div>
            </nav>
        </div>
    `
})
app.mount('#app')