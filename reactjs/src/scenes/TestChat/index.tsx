import * as React from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { Row } from 'antd';
import { HubConnection } from '@microsoft/signalr';
import AppConsts from '../../lib/appconst';

const Test = () => {
  const [, setConnection] = React.useState<HubConnection>();
  React.useEffect(() => {
    const connectionR = new HubConnectionBuilder()
      .withUrl(AppConsts.remoteServiceBaseUrl + 'signalr-myChatHub')
      .build();

    setConnection(connectionR);
    connectionR
      .start()
      .then(function () {
        console.log('successfully connected to hub');
       
        
        connectionR.on('getMessage', function (message) { // Register for incoming messages
          console.log('received message: ' + message);
        })

          connectionR.invoke('sendMessage', "Hi everybody, I'm connected to the chat!");


      })
      .catch(function (err: any) {
        return console.error(err.toString());
      });



    return () => {
      connectionR.stop();
      console.log('disconnected to hub');
    };
  }, []);

  // const sendMessage = async (url: string, note: string) => {
  //   try {
  //     await connection.invoke('SendMessage', url, note).catch(function (err) {
  //       return console.error(err.toString());
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Row>
      <h1>TEst</h1>
    </Row>
  );
};
export default Test;
