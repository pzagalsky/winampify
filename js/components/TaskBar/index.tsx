import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SingleExplorerState } from "../../reducers/explorer";
import { selectExplorers, selectImages } from "../../selectors/explorer";
import { AppState } from "../../reducers";
import { blueTitleBarDark, blueDrop, blueTitleBar } from "../../styles/colors";
import { FaFolder, FaImage } from "react-icons/fa";
import { WINDOW_TYPE, Window } from "../../reducers/windows";
import { findHighestPosition } from "../../utils/windows";
import { setOnTop, toggleMinimize } from "../../actions/windows";
import ImgCached from "../Reusables/ImgCached";
import winampIcon from "./winamp-icon.png";

const TaskBar: FunctionComponent = props => {
  const explorers = useSelector<AppState, SingleExplorerState[]>(
    selectExplorers
  );
  const images = useSelector(selectImages);
  const windows = useSelector((state: AppState) => state.windows.windows);

  const windowOnTop = windows.find(
    w => w.position === findHighestPosition(windows)
  );

  const dispatch = useDispatch();

  const renderExplorer = (w: Window) => {
    const exp = explorers.find(_exp => _exp.id === w.id);
    const otherWindowOnTop = windows
      .filter(win => win.id !== w.id)
      .find(
        win =>
          win.position ===
          findHighestPosition(windows.filter(win => win.id !== w.id))
      );

    return (
      <Item
        minimized={w.minimized}
        onClick={() => {
          dispatch(toggleMinimize(w.id));

          // TODO: This needs to go in the minimize action!

          if (!w.minimized) {
            if (windowOnTop.id === w.id) {
              if (otherWindowOnTop) {
                dispatch(setOnTop(otherWindowOnTop.id));
              }
            }
          } else {
            dispatch(setOnTop(w.id));
          }
        }}
      >
        <IconFolder></IconFolder>
        <Text>{exp?.title ?? "-"}</Text>
      </Item>
    );
  };

  const renderWinamp = (w: Window) => {
    const otherWindowOnTop = windows
      .filter(win => win.id !== w.id)
      .find(
        win =>
          win.position ===
          findHighestPosition(windows.filter(win => win.id !== w.id))
      );
    return (
      <Item
        minimized={w.minimized}
        onClick={() => {
          dispatch(toggleMinimize(w.id));

          if (!w.minimized) {
            if (windowOnTop.id === w.id) {
              if (otherWindowOnTop) {
                dispatch(setOnTop(otherWindowOnTop.id));
              }
            }
          } else {
            dispatch(setOnTop(w.id));
          }
        }}
      >
        <ImgCached
          src={winampIcon}
          style={{
            width: 17,
            height: 17,
            marginRight: 4
          }}
        />
        <Text>{"Winamp"}</Text>
      </Item>
    );
  };

  const renderImage = (w: Window) => {
    const otherWindowOnTop = windows
      .filter(win => win.id !== w.id)
      .find(
        win =>
          win.position ===
          findHighestPosition(windows.filter(win => win.id !== w.id))
      );
    const image = images.find(img => img.id === w.id);
    return (
      <Item
        minimized={w.minimized}
        onClick={() => {
          dispatch(toggleMinimize(w.id));

          if (!w.minimized) {
            if (windowOnTop.id === w.id) {
              if (otherWindowOnTop) {
                dispatch(setOnTop(otherWindowOnTop.id));
              }
            }
          } else {
            dispatch(setOnTop(w.id));
          }
        }}
      >
        <ImgCached
          src={image.source}
          style={{
            marginRight: 4
          }}
          cachedSize={{
            w: 20,
            h: 20
          }}
        />
        <Text>{image.title}</Text>
      </Item>
    );
  };

  return (
    <Container>
      {windows.map(window => {
        if (window.type === WINDOW_TYPE.Explorer) {
          return renderExplorer(window);
        }
        if (window.type === WINDOW_TYPE.Webamp) {
          return renderWinamp(window);
        }
        if (window.type === WINDOW_TYPE.Image) {
          return renderImage(window);
        }
      })}
      F
    </Container>
  );
};

export default TaskBar;

const Container = styled.div`
  background-color: #0d0a29;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
`;

const Item = styled.div<{
  minimized: boolean;
}>`
  width: 100px;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  background-color: ${props => (!props.minimized ? "black" : blueTitleBarDark)};
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`;

const Text = styled.div`
  text-overflow: ellipsis;
  text-align: center;
  font-size: 12px;
  color: white;
  overflow: hidden;
  white-space: nowrap;
`;

const IconFolder = styled(FaFolder)`
  width: 14px;
  height: 14px;
  fill: ${props => props.theme.folder.color};
  margin-right: 4px;
`;
