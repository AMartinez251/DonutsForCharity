import React from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';


export default class Selector extends React.Component {
    render() {
        return(
            <>

                <Grid container spacing={0} alignItems="center" justifyContent="center"> 
                    <Grid item xs={1} md={1}>
                        <div className="colorSwatch" 
                            style={{
                                backgroundColor: this.props.color, 
                                width: '15px', 
                                height: '15px', 
                                borderRadius: '50%',
                                float: 'left'
                        }}></div>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <p style={{float: 'left'}}>{this.props.name}</p>
                    </Grid>



                    { this.props.options.isSlide ? 

                        <Grid item xs={6} md={8}>
                            <Slider
                            style={{ width: '100%' }}
                            name={this.props.name}
                            min={this.props.options.min}
                            max={this.props.options.max}
                            value={parseInt(this.props.options.val)}
                            onChange={this.props.updateVal}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            />
                        </Grid>
                    
                    : <></> }

                </Grid> 
                
                <Grid container spacing={0} alignItems="center" justifyContent="center"> 
                    <Grid item xs={4} md={4}>
                        <TextField 
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        style={{ width: '100%' }}
                        name={this.props.name} 
                        value={parseInt(this.props.options.val)} 
                        onChange={this.props.updateVal}
                        id="standard-basic" 
                        label={this.props.name}
                        type="number"
                        />
                    </Grid>

                    { this.props.options.isTime ?
                        <Grid item xs={4} md={4}>
                            <Select
                            id="demo-simple-select"
                            value={this.props.options.timeInit}
                            name={this.props.name + "time"}
                            onChange={this.props.updateVal}
                            style={{ width: '100%' }}
                            >
                                <MenuItem value={1}>Hourly</MenuItem>
                                <MenuItem value={2}>Weekly</MenuItem>
                                <MenuItem value={3}>Monthly</MenuItem>
                            </Select>
                        </Grid>
                    : <></>}


                    { (this.props.options.isTime && this.props.options.timeInit) ? 
                        <Grid item xs={4} md={4}>
                            <TextField
                            disabled={this.props.options.timeInit === 1 ? false: true}
                            name={this.props.name + "hpw"} 
                            value={this.props.options.hPW} 
                            onChange={this.props.updateVal}
                            id="standard-basic" 
                            label={"hours per week"}
                            type="number"
                            style={{ width: '100%' }}
                            />
                        </Grid>
                    : <></>}
                </Grid>
            </>
        );
    }

}