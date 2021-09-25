import React, { useState } from "react";
import styles from "./Questions.module.scss";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cloneDeep } from "lodash";
import {
  Divider,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import TextDialog from "../TextDialog";

const useStyles = makeStyles((theme) => ({
  root: {
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
  isMouseOver: boolean;
  questions?: GraphItem[];
  categories?: GraphItem[];
};

const initialContextPos = {
  mouseX: null as number | null,
  mouseY: null as number | null,
  item: null as GraphItem | null,
};

interface Props {}

const initialQuestions: GraphItem[] = [
  {
    id: "1",
    name: "Financial",
    type: "topic",
    isMouseOver: false,
    questions: [
      {
        id: "2",
        name: "What should I do with my money? Invest it? If so, where? What are my options?",
        type: "question",
        isMouseOver: false,
      },
      {
        id: "3",
        name: "What is my cost of living?",
        type: "question",
        isMouseOver: false,
      },
      {
        id: "4",
        name: "Should I accept the job offer to work as a teacher?",
        type: "question",
        isMouseOver: false,
      },
    ],
  },
  {
    id: "5",
    name: "Health",
    type: "topic",
    isMouseOver: false,
    categories: [
      {
        id: "6",
        name: "Sleep",
        type: "topic",
        isMouseOver: false,
        questions: [
          {
            id: "7",
            name: "What kind of sleep schedule should I follow?",
            type: "question",
            isMouseOver: false,
          },
        ],
      },
      {
        id: "8",
        name: "Nutrition",
        type: "topic",
        isMouseOver: false,
        questions: [
          {
            id: "9",
            name: "What kind of diet should I eat?",
            type: "question",
            isMouseOver: false,
            questions: [
              {
                id: "10",
                name: "Should I eat things with refined oil in them?",
                type: "question",
                isMouseOver: false,
              },
              {
                id: "11",
                name: "Should I include soy in my diet? Is soy problematic to health? ",
                type: "question",
                isMouseOver: false,
              },
            ],
          },
          {
            id: "12",
            name: "Should I consume caffeine?",
            type: "question",
            isMouseOver: false,
          },
          {
            id: "13",
            name: "Should I take any supplements? If so, which ones?",
            type: "question",
            isMouseOver: false,
          },
        ],
      },
      {
        id: "14",
        name: "Vision",
        type: "topic",
        isMouseOver: false,
        questions: [
          {
            id: "15",
            name: "What kind of diet should I eat?",
            type: "question",
            isMouseOver: false,
            questions: [
              {
                id: "16",
                name: "Should I eat things with refined oil in them?",
                type: "question",
                isMouseOver: false,
              },
              {
                id: "17",
                name: "Should I include soy in my diet? Is soy problematic to health? ",
                type: "question",
                isMouseOver: false,
              },
            ],
          },
          {
            id: "18",
            name: "Should I consume caffeine?",
            type: "question",
            isMouseOver: false,
          },
          {
            id: "19",
            name: "Should I take any supplements? If so, which ones?",
            type: "question",
            isMouseOver: false,
          },
        ],
      },
    ],
  },
  {
    id: "20",
    name: "Stuff I Buy, Own and Use",
    type: "topic",
    isMouseOver: false,
    questions: [
      {
        id: "21",
        name: "What should I ask myself before buying something? What principles / critiera should stuff I buy meet?",
        type: "question",
        isMouseOver: false,
      },
      {
        id: "22",
        name: "Should I own a car? If so, which one?",
        type: "question",
        isMouseOver: false,
        questions: [
          {
            id: "23",
            name: "Where should I get my car serviced? Should I service it myself?",
            type: "question",
            isMouseOver: false,
          },
          {
            id: "24",
            name: "Should I insure my car? If so, what type, and with what company?",
            type: "question",
            isMouseOver: false,
          },
        ],
      },
      {
        id: "25",
        name: "Should I own a laptop? If so, which one?",
        type: "question",
        isMouseOver: false,
      },
      {
        id: "26",
        name: "Should I buy, own and use a carbon fibre road bike? If so, which one?",
        type: "question",
        isMouseOver: false,
      },
    ],
  },
];

const defaultExpandedItems = (items: GraphItem[]) => {
  let expanded = [] as string[];

  items.map((item) => {
    if (item.questions || item.categories) {
      expanded.push(item.id);
    }
    if (item.categories) {
      let subExpanded = defaultExpandedItems(item.categories);
      expanded.push(...subExpanded);
    }
    if (item.questions) {
      let subExpanded = defaultExpandedItems(item.questions);
      expanded.push(...subExpanded);
    }
  });

  return expanded;
};

const findQuestion = (
  items: GraphItem[],
  findId: string
): GraphItem | undefined => {
  let found = undefined;

  for (let item of items) {
    if (item.id === findId) {
      found = item;
      break;
    }
    if (item.categories) {
      let question = findQuestion(item.categories, findId);
      if (question) {
        found = question;
        break;
      }
    }
    if (item.questions) {
      let question = findQuestion(item.questions, findId);
      if (question) {
        found = question;
        break;
      }
    }
  }

  return found;
};

const QuestionsView = ({}: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const history = useHistory();
  const [contextPos, setContextPos] = useState(initialContextPos);
  const [showBranchQs, setShowBranchQs] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showQuestionDialog, setQuestionDialog] = useState(false);
  const [showTopicDialog, setTopicDialog] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [expanded, setExpanded] = useState(
    defaultExpandedItems(initialQuestions)
  );

  const menuItems = [
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

  if (!contextPos.item || contextPos.item.type === "topic") {
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
    if (item.categories || item.questions) {
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
        onMouseEnter={() => {
          let questionsCopy = cloneDeep(questions);
          let question = findQuestion(questionsCopy, item.id);
          if (question) {
            question.isMouseOver = true;
            setQuestions(questionsCopy);
          }
        }}
        onMouseLeave={() => {
          let questionsCopy = cloneDeep(questions);
          let question = findQuestion(questionsCopy, item.id);
          if (question) {
            question.isMouseOver = false;
            setQuestions(questionsCopy);
          }
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
      <TreeView
        className={classes.questionsTree}
        expanded={expanded}
        onNodeToggle={(event, nodeIds) => {
          setExpanded(nodeIds);
        }}
      >
        {questions &&
          questions.map((item) => (
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
