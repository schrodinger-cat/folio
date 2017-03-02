var apiURL = 'http://summary.dv/tools/get-all-works';

const Work = Vue.component('modal', {
	template: '#modal',

	data: function() {
		return {
			work: []
		}
	},

	created () {    
		// запрашиваем данные когда реактивное представление уже создано
		this.fetchData()
	},

	watch: {
		// в случае изменения маршрута запрашиваем данные вновь
		'$route': 'fetchData'
	},

	methods: {
		fetchData() {
			var self = this;
			var apiURL = 'http://summary.dv/tools/get-work/'+this.$route.params.url;

			$.get( apiURL, function( data ) {
				parseData = $.parseJSON(data);
			    self.work = parseData;
			});
		}
	}
})

const router = new VueRouter({
	routes: [
		{ path: '/:url', component: Work }
	]
})

var app = new Vue({
	router,

	el: '.works__wrap',

	data: {
		items: null,
		showModal: false
	},

	watch: {
		'$route' (to, from) {
			if(to.path == '/') {
				$('body').removeClass('_open');
			} else {
				$('body').addClass('_open');
			}
		}
	},

	created: function () {
		this.fetchData();
	},

	methods: {
		fetchData: function () {
			var self = this;
			$.get( apiURL, function( data ) {
				parseData = $.parseJSON(data);
			    self.items = parseData;
			});
		}
	}
}).$mount('.works__wrap')