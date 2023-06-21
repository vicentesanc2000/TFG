import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Match from './Match'
import getFetchResponse from '../services/getFetchResponse'

class ListOfMatches extends Component {

    state = {
        region: 'europe',
        matches: []
    }

    componentDidMount() {
        var matchList = []
        this.props.matchIdList.map(matchID => {
            var match = this.getMatchData(matchID);
            var res = match.then(res => { return res });
            matchList.push(res);
        })
        Promise.all(matchList).then((values) => {
            this.setState({ matches: values })
        })

    }


    getMatchData = async (matchID) => {
        const matchUrl = 'http://localhost:8080/riot/' + 'europe' + '/getmatchinfo/' + matchID;
        const match = await getFetchResponse(matchUrl);
        return match;
    }

    render() {
        let matches = this.state.matches;

        return <div>
            <ul>
                {
                    matches.map((match) =>
                        <li key={match.metadata.matchId}>
                            <Match
                                match={match}
                                puuid={this.props.puuid}
                            />
                        </li>
                    )
                }
            </ul>
        </div>
    }

}

ListOfMatches.propTypes = {
    matchIdList: PropTypes.arrayOf(PropTypes.string),
    puuid: PropTypes.string.isRequired,
};

export default ListOfMatches;