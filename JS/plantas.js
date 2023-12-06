const { createApp } = Vue
    createApp({
        data() {
            return {
                plantas:[],
//url:'http://localhost:5000/productos',
// si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
                url:'http://127.0.0.1:5000/plantas', 
                error:false,
                cargando:true,
/*atributos para guardar los valores del formulario */
                id:0,
                nombreComun:"",
                nombreCientif:"",
                imagen:"",
            }
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.plantas = data;
                        this.cargando=false
                    })
                    .catch(err => {
                        console.error(err);
                        this.error=true
                    })
            },
            eliminar(plantas) {
                const url = this.url+'/' + plantas; //ver "planta" no se bien qué va ahí y qué le paso por parámetro a eliminar
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                })
            },
            grabar(){
                let plantas = {  //planta o plantas?? va el nombre de la tabla ahí? 
                    nombreComun:this.nombreComun,
                    nombreCientif: this.nombreCientif,
                    imagen:this.imagen
                }
                var options = {
                    body:JSON.stringify(plantas),//planta o plantas??
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    redirect: 'follow'
                }
                fetch(this.url, options)
                    .then(function () {
                        alert("Registro grabado")
                        window.location.href = "./identificador_de_plantas.html";   
                    })
                    .catch(err => {
                        console.error(err);
                        alert("Error al Grabar")
                    })
            }
        },
        created() {
            this.fetchData(this.url)
        },
    }).mount('#app')