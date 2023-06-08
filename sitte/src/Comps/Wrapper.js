import React from 'react'
import Selector from './Selector.js';
import Button from '@mui/material/Button';
import Chart from "react-apexcharts";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0,
            newEl: "{\"name\":\"solar\",\"val\":8,\"isSlide\":true,\"isTime\":false,\"min\":7,\"max\":30,\"timeInit\":1,\"hPW\":5}",

            chartOptions: {
                colors: ['#ffd235', '#ffc323', '#ffb40d', '#ffa400', '#ff9300', '#ff8100'],
                stroke: {
                    width: 0
                },
                legend: {
                    show: true,
                    position: 'top'
                },
                labels: [],
                plotOptions: {

                    pie: {
                        expandOnClick: false,
                        donut: {
                            labels: {
                                show: false,
                                name: {
                                    show: false
                                },
                                value: {
                                    show: false
                                }
                            },
                            total: {
                                show: true,
                                showAlways: true
                            }
                        }
                    },
                }
            },
            arr: [{
                name: "gas",
                val: 87,
                isSlide: true,
                isTime: true,
                min: 60,
                max: 100,
                timeInit: 3, // [hourly: 1, weekly: 2, monthly: 3]
                hPW: 0 // hours per Week
            },
            {
                name: "electric",
                val: 87,
                isSlide: true,
                isTime: true,
                min: 60,
                max: 100,
                timeInit: 3, // [hourly: 1, weekly: 2, monthly: 3]
                hPW: 0 // hours per Week
            },
            {
                name: "Notelectric",
                val: 87,
                isSlide: true,
                isTime: true,
                min: 60,
                max: 100,
                timeInit: 3, // [hourly: 1, weekly: 2, monthly: 3]
                hPW: 0 // hours per Week
            },
            {
                name: "solar",
                val: 8,
                isSlide: true,
                isTime: false,
                min: 7,
                max: 30,
                timeInit: 3, // [hourly: 1, weekly: 2, monthly: 3]
                hPW: 0 // hours per Week
            }]
        }

        this.updateValues = this.updateValues.bind(this);
    }

    getSeries = (arr) => {
        return (arr.map(element => {
            if (element.timeInit === 1) {
                return element.val * element.hPW * 4;
            } else if (element.timeInit === 2) {
                return (element.val *  4);
            } else if (element.timeInit === 3) {
                return (element.val);
            }
            return 0;
        })
        )
    }

    getTotal = () => {
        let addVar = 0;
        this.state.arr.forEach(element => {
            if (element.timeInit === 1) {
                addVar += element.val * element.hPW * 4;
            } else if (element.timeInit === 2) {
                addVar += element.val *  4;
            } else if (element.timeInit === 3) {
                addVar += element.val;
            }    
            
        })
        this.setState({ total: addVar })
    }

    componentDidMount = () => {
        this.setState({
            chartOptions: {
                ...this.state.chartOptions,
                labels: this.state.arr.map(element => element.name)
            }
        })

        this.getTotal()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if ((this.state.arr.length !== prevState.arr.length) && prevProps) {
            this.setState({
                chartOptions: {
                    ...this.state.chartOptions,
                    labels: this.state.arr.map(element => element.name)
                }
            })
        }
        if (prevState.arr !== this.state.arr) {
            this.getTotal()
        }
    }

    updateNewEl = (e) => {
        this.setState({ newEl: e.target.value });
    }

    updateValues = (e) => {        
        var index = this.state.arr.findIndex(element => element.name === e.target.name);
        if (index >= 0) {

            let arrHold = [...this.state.arr];
            let el = {...arrHold[index]};

            if (e.target.value > el.max) {
                el.val = el.max;
            } else if (e.target.value < el.min) {
                el.val = el.min;
            } else {
                el.val = parseInt(e.target.value);
            }

            arrHold[index] = el;
            this.setState({ arr: arrHold });
        }
        index = this.state.arr.findIndex(element => element.name + "time" === e.target.name);
        if (index >= 0) {

            let arrHold = [...this.state.arr];
            let el = {...arrHold[index]};
            el.timeInit = e.target.value;
            arrHold[index] = el;
            this.setState({ arr: arrHold });
        }
        index = this.state.arr.findIndex(element => element.name + "hpw" === e.target.name);
        if (index >= 0) {

            let arrHold = [...this.state.arr];
            let el = {...arrHold[index]};

            if (e.target.value < 0) {
                el.hPW = 0;
            } else {
                el.hPW = e.target.value;
            }
            arrHold[index] = el;
            this.setState({ arr: arrHold });
        }
    }

    // disable hpw

    addMe = () => {
        const me = JSON.parse(this.state.newEl);

        if (this.state.arr.findIndex(element => element.name === me.name) > -1) {
            alert(`"${me.name}" is already a name`);
            return;
        }

        let arrHold = [...this.state.arr];
        arrHold.push(me)
        this.setState({ arr: arrHold });
    }

    removeMe = () => {
        let arrHold = [...this.state.arr];
        JSON.stringify(arrHold.pop())
        this.setState({ arr: arrHold });
    }



    render() {
        return(
            <>
                <h1>Monthly Expense Breakdown: ${this.state.total}</h1>
                <div className="bigCont">
                <Grid container spacing={0} alignItems="center" justifyContent="center"> 
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} margin="auto">
                        <Box width={{ xs: '100%', 
                                    sm: '100%', 
                                    md: '100%' , 
                                    lg: '100%', 
                                    xl: '100%'}}
                            justifyContent="center"
                        >
                            <div id="chart">
                                <Chart options={this.state.chartOptions} series={this.getSeries(this.state.arr)} type="donut"/>
                            </div>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <div className="selectWidth">
                            { this.state.arr.map((element, index) => {
                                return (
                                    <Selector color={this.state.chartOptions.colors[index]} key={element.name} name={element.name} options={element} updateVal={this.updateValues}/>
                                    )
                            })}
                        </div>
                    </Grid>
                </Grid>
                </div>

                <br />
                <div className="contJSON">
                    <TextField
                        fullWidth
                        id="standard-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        value={this.state.newEl}
                        onChange={this.updateNewEl}
                        variant="standard"
                        />
                </div>


                <Button variant="outlined" onClick={this.addMe}>Add Me</Button>
                <Button variant="outlined" onClick={this.removeMe}>Remove Me</Button>
            </>
        )
    }

}