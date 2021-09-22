import React, { useState } from "react";
import styles from "./Questions.module.scss";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Divider,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    cursor: "context-menu",
    height: "100%",
  },
  questionsHeading: {
    marginLeft: 20,
    marginTop: 20,
  },
  questionsTree: {
    marginLeft: 20,
  },
  treeItemRoot: {
    marginTop: 10,
    marginBottom: 10,
  },
  topicLabel: {
    fontWeight: "bold",
  },
}));

type GraphItem = {
  id: string;
  name: string;
  type: string;
  questions?: GraphItem[];
  categories?: GraphItem[];
};

const initialContextPos = {
  mouseX: null as number | null,
  mouseY: null as number | null,
  item: null as GraphItem | null,
};

interface Props {}

const QuestionsView = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [contextPos, setContextPos] = useState(initialContextPos);
  const [showBranchQs, setShowBranchQs] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const questions: GraphItem[] = [
    {
      id: "1",
      name: "Financial",
      type: "topic",
      questions: [
        {
          id: "2",
          name: "What should I do with my money? Invest it? If so, where? What are my options?",
          type: "question",
        },
        {
          id: "3",
          name: "What is my cost of living?",
          type: "question",
        },
        {
          id: "4",
          name: "Should I accept the job offer to work as a teacher?",
          type: "question",
        },
      ],
    },
    {
      id: "5",
      name: "Health",
      type: "topic",
      categories: [
        {
          id: "6",
          name: "Sleep",
          type: "topic",
          questions: [
            {
              id: "7",
              name: "What kind of sleep schedule should I follow?",
              type: "question",
            },
          ],
        },
        {
          id: "8",
          name: "Nutrition",
          type: "topic",
          questions: [
            {
              id: "9",
              name: "What kind of diet should I eat?",
              type: "question",
              questions: [
                {
                  id: "10",
                  name: "Should I eat things with refined oil in them?",
                  type: "question",
                },
                {
                  id: "11",
                  name: "Should I include soy in my diet? Is soy problematic to health? ",
                  type: "question",
                },
              ],
            },
            {
              id: "12",
              name: "Should I consume caffeine?",
              type: "question",
            },
            {
              id: "13",
              name: "Should I take any supplements? If so, which ones?",
              type: "question",
            },
          ],
        },
        {
          id: "14",
          name: "Vision",
          type: "topic",
          questions: [
            {
              id: "15",
              name: "What kind of diet should I eat?",
              type: "question",
              questions: [
                {
                  id: "16",
                  name: "Should I eat things with refined oil in them?",
                  type: "question",
                },
                {
                  id: "17",
                  name: "Should I include soy in my diet? Is soy problematic to health? ",
                  type: "question",
                },
              ],
            },
            {
              id: "18",
              name: "Should I consume caffeine?",
              type: "question",
            },
            {
              id: "19",
              name: "Should I take any supplements? If so, which ones?",
              type: "question",
            },
          ],
        },
      ],
    },
    {
      id: "20",
      name: "Stuff I Buy, Own and Use",
      type: "topic",
      questions: [
        {
          id: "21",
          name: "What should I ask myself before buying something? What principles / critiera should stuff I buy meet?",
          type: "question",
        },
        {
          id: "22",
          name: "Should I own a car? If so, which one?",
          type: "question",
          questions: [
            {
              id: "23",
              name: "Where should I get my car serviced? Should I service it myself?",
              type: "question",
            },
            {
              id: "24",
              name: "Should I insure my car? If so, what type, and with what company?",
              type: "question",
            },
          ],
        },
        {
          id: "25",
          name: "Should I own a laptop? If so, which one?",
          type: "question",
        },
        {
          id: "26",
          name: "Should I buy, own and use a carbon fibre road bike? If so, which one?",
          type: "question",
        },
      ],
    },
  ];

  const menuItems = [
    {
      id: "m1",
      name: "Create Topic",
      divider: false,
      onClick: () => {
        setContextPos(initialContextPos);
      },
    },
    {
      id: "m2",
      name: "Create Question",
      divider: false,
      onClick: () => {
        setContextPos(initialContextPos);
      },
    },
    {
      id: "m3",
      name: `${showBranchQs ? "Hide" : "Show"} Branch Questions`,
      divider: true,
      onClick: () => {
        setShowBranchQs(!showBranchQs);
      },
    },
    {
      id: "m4",
      name: `${showArchive ? "Hide" : "Show"} Archive`,
      divider: false,
      onClick: () => {
        setShowArchive(!showArchive);
      },
    },
  ];

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
    return (
      <TreeItem
        nodeId={item.id}
        classes={{
          root: classes.treeItemRoot,
          label: item.type === "topic" ? classes.topicLabel : "",
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
      >
        {item.questions &&
          item.questions.map((item) => (
            <GraphTreeItem key={`graph_${item.id}`} {...item} />
          ))}

        {item.categories &&
          item.categories.map((item) => (
            <GraphTreeItem key={`graph_${item.id}`} {...item} />
          ))}
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
      <Typography variant="h5">Personal</Typography>
      <Typography className={classes.questionsHeading} variant="h6">
        Questions
      </Typography>
      <TreeView className={classes.questionsTree}>
        {questions &&
          questions.map((item) => (
            <GraphTreeItem key={`graph_${item.id}`} {...item} />
          ))}
      </TreeView>
      <Menu
        keepMounted
        open={contextPos.mouseY !== null}
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
    </div>
  );
};

export default QuestionsView;
