$(function(){
	//学历分布图
	educational();
	//职位分布图
	jobDistribution();
})

//职位分布的饼图
function jobDistribution(){
	var myChart=echarts.init(document.getElementById('employee'));
	var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        show:true,
		        left: 'center',
		        data: ['职位分布'],
		    },
		    color:["#9678d7","#67a6ef","#fcb444","#49ccdb"],
		    series : [
		        {
		            name: '职位分布',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:335, name:'本科'},
		                {value:310, name:'专科'},
		                {value:234, name:'其他'},
		                {value:135, name:'高中'}
		            ]
		   
		        }
		    ]
		};
	myChart.setOption(option);	
}


//学历分布的饼图
function educational(){
	var myChart=echarts.init(document.getElementById('educational'));
	var option = {
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        show:true,
		        left: 'center',
		        data: ['职位分布'],
		    },
		    color:["#9678d7","#67a6ef","#fcb444","#49ccdb"],
		    series : [
		        {
		            name: '职位分布',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:335, name:'本科'},
		                {value:310, name:'专科'},
		                {value:234, name:'其他'},
		                {value:135, name:'高中'}
		            ]
		   
		        }
		    ]
		};
	myChart.setOption(option);	
}