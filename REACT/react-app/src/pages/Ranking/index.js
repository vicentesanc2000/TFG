import React, { Component } from 'react';
import RankingTable from '../../components/RankingTable';

class Ranking extends Component {

    state = {

    }

    render() {
        return (
            <div className='App'>
                <h1>Ranking</h1>
                <RankingTable></RankingTable>
            </div>
        );
    }
}

export default Ranking;