import React, { Component } from 'react';
import { Typography, Space, Col, Row } from 'antd';
import ReactPlayer from 'react-player/youtube';

const { Title, Text } = Typography;

class Tips extends Component {

    render() {
        return (
            <div className="App">
                <Col span={12} offset={5}>
                    <Space direction='vertical'>
                        <Title>Consejos</Title>
                        <Text strong={true}>En esta sección podrás encontrar algunos consejos y enlaces a vídeos que te ayudarán a mejorar, estos están separados por niveles dónde podrás visualizar vídeos que se ajusten aproximadamente a cada nivel. Dicho esto es recomendable ver los vídeos anteriores a tu nivel actual, ya que puede haber conceptos que no conozcas que te pueden resultar realmente utiles.</Text>
                        
                        <Title level={2}>Nivel Hierro</Title>
                        <Text strong={true}>En este vídeo del primer nivel puedes encontrar información acerca de la base de selección del juego. También explica algunos conceptos básicos relacionados con las composiciones y el enfoque al juego temprano o tardío. Así mismo también profundiza conceptos como "frontline", "backline" "rango" y "daño".</Text>
                        <ReactPlayer url='https://youtu.be/hO4OumdWf-I' controls={true}  style={{transform: "translate(25%, 0%)"}}/>

                        <Title level={2}>Nivel Bronce</Title>
                        <Text strong={true}>Este vídeo profundiza acerca de los counters en la base de selección de personajes y cómo puede afectar a la partida. Además se dan explicaciones sobre conceptos como "pocket pick", "cheese pick" o "matchup composicional". También profundiza bastante en los tipos de composiciones que existen en el juego y como deben jugarse cada una de estas.</Text>
                        <ReactPlayer url='https://youtu.be/3A_wT_Fq7lQ' controls={true} style={{transform: "translate(25%, 0%)"}}/>


                        <Title level={2}>Nivel Plata</Title>
                        <ReactPlayer url='https://youtu.be/2BtE4PASlQE' controls={true} style={{transform: "translate(25%, 0%)"}}/>


                        <Title level={2}>Nivel Oro</Title>
                        <ReactPlayer url='https://youtu.be/R8q31uERZXE' controls={true} style={{transform: "translate(25%, 0%)"}}/>


                        <Title level={2}>Nivel Platino</Title>
                        <ReactPlayer url='https://youtu.be/xhEyU5CAbNs' controls={true} style={{transform: "translate(25%, 0%)"}}/>


                        <Title level={2}>Nivel Diamante</Title>
                        <ReactPlayer url='https://youtu.be/8xVMRxAt5AE' controls={true} style={{transform: "translate(25%, 0%)"}}/>

                    </Space>
                </Col>
            </div>
        );

    }
}

export default Tips;