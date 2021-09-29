import React, { useState } from "react";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LockIcon from "@material-ui/icons/Lock";
import GroupIcon from "@material-ui/icons/Group";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Divider,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import TextDialog from "../TextDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  toggleShowArchive,
  toggleShowBranchQs,
} from "../../slice/configurationSlice";
import {
  Graph,
  GraphItem,
  GraphItemType,
  setMouseOver,
} from "../../slice/graphsSlice";
import { Routes } from "../../router";

import styles from "./Questions.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "context-menu",
  },
  graphHeading: {
    fontSize: "1.25rem",
    color: "#888",
    marginLeft: 25,
    marginTop: 15,
  },
  graphIcon: {
    fontSize: "1.05rem",
  },
  questionsHeading: {
    marginLeft: 30,
    marginTop: 20,
  },
  questionsTree: {
    marginLeft: 30,
    marginTop: 20,
  },
  treeItemRoot: {
    marginTop: 10,
    marginBottom: 10,
  },
  topicLabel: {
    fontWeight: "bold",
  },
}));

const initialContextPos = {
  mouseX: null as number | null,
  mouseY: null as number | null,
  item: null as GraphItem | null,
};

const defaultExpandedItems = (items: GraphItem[]) => {
  let expanded = [] as string[];

  items.map((item) => {
    if (item.questions || item.topics) {
      expanded.push(item.id);
    }
    if (item.topics) {
      let subExpanded = defaultExpandedItems(item.topics);
      expanded.push(...subExpanded);
    }
    if (item.questions) {
      let subExpanded = defaultExpandedItems(item.questions);
      expanded.push(...subExpanded);
    }
  });

  return expanded;
};

interface Props {
  graph: Graph;
}

const QuestionsView = ({ graph }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const classes = useStyles();
  const { showBranchQs, showArchive } = useSelector(
    (state: RootState) => state.configuation
  );
  const dispatch = useDispatch();
  const [contextPos, setContextPos] = useState(initialContextPos);
  const [showQuestionDialog, setQuestionDialog] = useState(false);
  const [showTopicDialog, setTopicDialog] = useState(false);
  const [expanded, setExpanded] = useState(defaultExpandedItems(graph.data));

  const menuItems = [
    {
      id: "m3",
      name: `${showBranchQs ? "Hide" : "Show"} Branch Questions`,
      divider: true,
      onClick: () => {
        dispatch(toggleShowBranchQs());
      },
    },
    {
      id: "m4",
      name: `${showArchive ? "Hide" : "Show"} Archive`,
      divider: false,
      onClick: () => {
        dispatch(toggleShowArchive());
      },
    },
  ];

  if (!contextPos.item || contextPos.item.type === GraphItemType.Topic) {
    menuItems.unshift({
      id: "m1",
      name: "Create Topic",
      divider: false,
      onClick: () => {
        setContextPos(initialContextPos);
        setTopicDialog(true);
      },
    });
  }

  if (contextPos.item) {
    menuItems.unshift({
      id: "m2",
      name: "Create Question",
      divider: false,
      onClick: () => {
        setContextPos(initialContextPos);
        setQuestionDialog(true);
      },
    });
  }

  if (contextPos.item) {
    menuItems.push(
      {
        id: "m5",
        name: "Rename",
        divider: true,
        onClick: () => {
          setContextPos(initialContextPos);
        },
      },
      {
        id: "m6",
        name: "Archive",
        divider: false,
        onClick: () => {
          setContextPos(initialContextPos);
        },
      },
      {
        id: "m7",
        name: "Delete",
        divider: false,
        onClick: () => {
          setContextPos(initialContextPos);
        },
      }
    );
  }

  const GraphTreeItem = (item: GraphItem) => {
    let icon = <></>;
    let isExpanded = expanded.find((value) => value === item.id);
    if (item.topics || item.questions) {
      if (isExpanded) {
        icon = <ExpandMoreIcon />;
      } else if (item.isMouseOver) {
        icon = <ChevronRightIcon />;
      }
    }

    return (
      <TreeItem
        icon={icon}
        nodeId={item.id}
        classes={{
          root: classes.treeItemRoot,
          label: item.type === GraphItemType.Topic ? classes.topicLabel : "",
        }}
        label={item.name}
        onContextMenu={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setContextPos({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            item,
          });
        }}
        onMouseEnter={() =>
          dispatch(
            setMouseOver({ id: item.id, graphId: graph.id, isMouseOver: true })
          )
        }
        onMouseLeave={() =>
          dispatch(
            setMouseOver({ id: item.id, graphId: graph.id, isMouseOver: false })
          )
        }
        onClick={
          item.type === GraphItemType.Topic
            ? undefined
            : () =>
                history.push(
                  `${Routes.Questions}?graph=${graph.id}&question=${item.id}`
                )
        }
      >
        {item.questions &&
          item.questions.map((item) => (
            <GraphTreeItem key={item.id} {...item} />
          ))}

        {item.topics &&
          item.topics.map((item) => <GraphTreeItem key={item.id} {...item} />)}
      </TreeItem>
    );
  };

  return (
    <div
      className={classes.root}
      onContextMenu={(event) => {
        event.preventDefault();
        setContextPos({
          mouseX: event.clientX - 2,
          mouseY: event.clientY - 4,
          item: null,
        });
      }}
    >
      <Typography className={classes.graphHeading}>
        {graph.name}{" "}
        {graph.isPrivate ? (
          <LockIcon className={classes.graphIcon} />
        ) : (
          <GroupIcon className={classes.graphIcon} />
        )}
      </Typography>
      <Typography className={classes.questionsHeading} variant="h6">
        Questions
      </Typography>
      <TreeView
        className={classes.questionsTree}
        expanded={expanded}
        onNodeToggle={(event, nodeIds) => {
          setExpanded(nodeIds);
        }}
      >
        {graph.data &&
          graph.data.map((item) => (
            <GraphTreeItem key={`graph_${item.id}`} {...item} />
          ))}
      </TreeView>
      <Menu
        keepMounted
        open={
          contextPos.mouseY !== null && !showQuestionDialog && !showTopicDialog
        }
        onClose={() => {
          setContextPos(initialContextPos);
        }}
        anchorReference="anchorPosition"
        anchorPosition={
          contextPos.mouseY !== null && contextPos.mouseX !== null
            ? { top: contextPos.mouseY, left: contextPos.mouseX }
            : undefined
        }
      >
        {menuItems.map((menuItem) => {
          return (
            <div key={menuItem.id}>
              {menuItem.divider && <Divider />}
              <MenuItem onClick={menuItem.onClick}>{menuItem.name}</MenuItem>
            </div>
          );
        })}
        ;
      </Menu>
      {showTopicDialog && (
        <TextDialog
          buttonText="Create Topic"
          labelText="Topic"
          onClose={() => setTopicDialog(false)}
          onOkay={(topic) => {
            console.log(topic);
            setTopicDialog(false);
          }}
        />
      )}
      {showQuestionDialog && (
        <TextDialog
          buttonText="Create Question"
          labelText="Question"
          onClose={() => setQuestionDialog(false)}
          onOkay={(question) => {
            console.log(question);
            setQuestionDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default QuestionsView;
