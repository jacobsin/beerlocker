import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getDetail, getMainImageUrl } from '../selectors';
import { fetchOne, selectImage } from '../actions';
import { checkmark } from '../helpers/unicode';

class PhoneDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch, params} = this.props;
    dispatch(fetchOne(params.id));
  }

  render() {
    const {detail, mainImageUrl, dispatch} = this.props;
    if (!detail) return (<div>mooo</div>);

    return (
        <div>
          <img src={mainImageUrl || detail.images[0]} className="phone"/>

          <h1>{detail.name}</h1>

          <p>{detail.description}</p>

          <ul className="phone-thumbs">
            {detail.images.map(i =>
            <li key={i}>
              <img src={i} onClick={()=>dispatch(selectImage(i))} />
            </li>
            )}
          </ul>

          <ul className="specs">
            <li>
              <span>Availability and Networks</span>
              <dl>
                <dt>Availability</dt>
                {detail.availability.map(availability =>
                  <dd key={availability}>{availability}</dd>
                )}
              </dl>
            </li>
            <li>
              <span>Battery</span>
              <dl>
                <dt>Type</dt>
                <dd>{detail.battery.type}</dd>
                <dt>Talk Time</dt>
                <dd>{detail.battery.talkTime}</dd>
                <dt>Standby time (max)</dt>
                <dd>{detail.battery.standbyTime}</dd>
              </dl>
            </li>
            <li>
              <span>Storage and Memory</span>
              <dl>
                <dt>RAM</dt>
                <dd>{detail.storage.ram}</dd>
                <dt>Internal Storage</dt>
                <dd>{detail.storage.flash}</dd>
              </dl>
            </li>
            <li>
              <span>Connectivity</span>
              <dl>
                <dt>Network Support</dt>
                <dd>{detail.connectivity.cell}</dd>
                <dt>WiFi</dt>
                <dd>{detail.connectivity.wifi}</dd>
                <dt>Bluetooth</dt>
                <dd>{detail.connectivity.bluetooth}</dd>
                <dt>Infrared</dt>
                <dd>{checkmark(detail.connectivity.infrared)}</dd>
                <dt>GPS</dt>
                <dd>{checkmark(detail.connectivity.gps)}</dd>
              </dl>
            </li>
            <li>
              <span>Android</span>
              <dl>
                <dt>OS Version</dt>
                <dd>{detail.android.os}</dd>
                <dt>UI</dt>
                <dd>{detail.android.ui}</dd>
              </dl>
            </li>
            <li>
              <span>Size and Weight</span>
              <dl>
                <dt>Dimensions</dt>
                {detail.sizeAndWeight.dimensions.map(dim=>
                  <dd key={dim}>{dim}</dd>
                )}
                <dt>Weight</dt>
                <dd>{detail.sizeAndWeight.weight}</dd>
              </dl>
            </li>
            <li>
              <span>Display</span>
              <dl>
                <dt>Screen size</dt>
                <dd>{detail.display.screenSize}</dd>
                <dt>Screen resolution</dt>
                <dd>{detail.display.screenResolution}</dd>
                <dt>Touch screen</dt>
                <dd>{checkmark(detail.display.touchScreen)}</dd>
              </dl>
            </li>
            <li>
              <span>Hardware</span>
              <dl>
                <dt>CPU</dt>
                <dd>{detail.hardware.cpu}</dd>
                <dt>USB</dt>
                <dd>{detail.hardware.usb}</dd>
                <dt>Audio / headphone jack</dt>
                <dd>{detail.hardware.audioJack}</dd>
                <dt>FM Radio</dt>
                <dd>{checkmark(detail.hardware.fmRadio)}</dd>
                <dt>Accelerometer</dt>
                <dd>{checkmark(detail.hardware.accelerometer)}</dd>
              </dl>
            </li>
            <li>
              <span>Camera</span>
              <dl>
                <dt>Primary</dt>
                <dd>{detail.camera.primary}</dd>
                <dt>Features</dt>
                <dd>{detail.camera.features.join(', ')}</dd>
              </dl>
            </li>
            <li>
              <span>Additional Features</span>
              <dd>{detail.additionalFeatures}</dd>
            </li>
          </ul>
        </div>
      );
  }

}

PhoneDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  detail: PropTypes.object,
  mainImageUrl: PropTypes.string
};

export default connect(
  createStructuredSelector({detail: getDetail, mainImageUrl: getMainImageUrl})
)(PhoneDetail);
