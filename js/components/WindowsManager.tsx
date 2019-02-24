import React from "react";
import { connect } from "react-redux";
import { WindowType, Window } from "../reducers/windows";
import ImagesModal from "./Explorer/ImagesModal";
import Explorer from "./Explorer";
import { Image } from "../types";
import { selectImages } from "../selectors/explorer";
import { getWindows } from "../selectors/windows";
import { AppState } from "../reducers";
import { closeImage } from "../actions/images";
import { createNewExplorer } from "../actions/explorer";
import { setOnTop } from "../actions/windows";
import WindowInstance from "./WindowInstance";

interface StateProps {
  explorersIds: Array<string>;
  images: Array<Image>;
  windows: Array<Window>;
}

interface DispatchProps {
  closeImage: (key: string) => void;
  createNewExplorer: () => void;
  setOnTop: (id: string) => void;
}

type Props = StateProps & DispatchProps;

class WindowsManager extends React.Component<Props, {}> {
  getWindow(window: Window, index: number) {
    switch (window.type) {
      case WindowType.Explorer:
        return (
          <Explorer key={window.id} explorerId={window.id} zIndex={index * 5} />
        );
      case WindowType.Image: {
        const image = this.props.images.find(img => img.id === window.id);
        if (image !== undefined)
          return (
            <ImagesModal
              key={window.id}
              image={image}
              onDismiss={() => this.props.closeImage(window.id)}
            />
          );
      }
      default:
        return null;
    }
  }

  componentDidMount() {
    this.props.createNewExplorer();
  }
  render() {
    return (
      <>
        {this.props.windows.map((window: Window, index) => {
          return (
            <WindowInstance
              key={window.id}
              zIndex={index * 10000}
              setOnTop={() => this.props.setOnTop(window.id)}
            >
              {this.getWindow(window, index)}
            </WindowInstance>
          );
        })}
      </>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  images: selectImages(state),
  explorersIds: state.explorer.allIds,
  windows: getWindows(state)
});

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  closeImage: (key: string) => dispatch(closeImage(key)),
  createNewExplorer: () => dispatch(createNewExplorer()),
  setOnTop: id => dispatch(setOnTop(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowsManager);