//about
app.component("about-content", {
    props: ['names', 'covers'],
    template: `
    <div id="about" class="container-fluid pt-3 ">
        <div id="team" class="row justify-content-center">
            <h2> Meet Our Team </h2>
            <div class="col-lg-2 col-md-6 col-12" v-for="(value,key) in names">
                <div class="card">
                    <div class="content">
                        <div class="front">
                            <img :src="'images/about/'+ key +'.svg'">
                        </div>
                        <div class="back">
                            {{value.role}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <h2> About <span class="lightgreen"> Personalify </span> </h2>
            <div id="covers" class="col-lg-3 col-md-6 col-12" v-for="cover in covers">
                <div class="card">
                    <div class="content">
                        <div class="front">
                            <img :src="cover.cardImg">
                        </div>
                        <div class="back">
                            {{cover.full_desc}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    `
})