import React, {createContext, Component} from 'react';

const AppContext = createContext();

export class Provider extends Component {
    state = {
        globalSummoner: "",
        globalPuuid: "",
        globalServer: "euw1"
    }

    setContextSummoner = (newSummoner) => {
        this.setState({globalSummoner:newSummoner})
    }

    setContextPuuid = (newPuuid) => {
        this.setState({globalPuuid:newPuuid})
    }

    setContextServer = (newServer) => {
        this.setState({globalServer:newServer})
    }

    render() {
        const {globalSummoner, globalPuuid, globalServer} = this.state;
        const {setContextSummoner, setContextPuuid, setContextServer} = this;
        return (
            <div>
                <AppContext.Provider value = {{
                    globalSummoner,
                    globalPuuid,
                    globalServer,
                    setContextPuuid,
                    setContextSummoner,
                    setContextServer
                }}>
                    {this.props.children}
                </AppContext.Provider>
            </div>
        );
    }
}

export default AppContext;