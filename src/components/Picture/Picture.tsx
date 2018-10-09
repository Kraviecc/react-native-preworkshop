import * as React from 'react';
import Configuration from 'src/models/Configuration';

interface IPictureProps {
  src: string;
}

class Picture extends React.Component<IPictureProps> {
  public render() {
    return (
      <img src={this.props.src}
        height={Configuration.PictureHeight} />
    );
  }
}

export default Picture;