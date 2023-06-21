import React, { Component } from 'react';
import StatsTable from '../../components/StatsTable';

class ChampionStats extends Component {

    state = {

    }

    render() {
        return (
            <div className='App'>
                <h1>Champion Stats</h1>
                <StatsTable></StatsTable>
            </div>
        );
    }
}

export default ChampionStats;