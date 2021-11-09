//about
app.component("about-content", {
    props: ['names', 'covers'],
    template: `
    <div id="about" class="container-fluid text-center">
        <div class="row justify-content-center" id="team">
            <h3> Meet Our Team </h3>
            <div class="col-lg-2 col-md-6 col-12" v-for="(value,key) in names">
                <img :src="'images/about/'+key+'.png'">
            </div>
        </div>

        <div id="covers" class="row justify-content-center">
            <h3> About <span class="lightgreen"> Personalify </span> </h3>
            <div class="col-lg-4 col-md-6 col-12" v-for="cover in covers">
                <img :src="cover.cardImg">
            </div>
        </div>

    </div>
    `
})