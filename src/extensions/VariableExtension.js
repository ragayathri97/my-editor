import { Mention } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { VariableList } from "../components/VariableList";
import { VARIABLES } from "../variables";

export const VariableExtension = Mention.configure({
  HTMLAttributes: {
    class: "variable-token",
  },
  suggestion: {
    char: "{{",
    items: ({ query }) => {
      return VARIABLES.filter((variable) =>
        variable.label.toLowerCase().includes(query.toLowerCase())
      );
    },
    render: () => {
      let component;
      let popup;

      return {
        onStart: (props) => {
          component = new ReactRenderer(VariableList, {
            props: { ...props, variables: VARIABLES },
            editor: props.editor,
          });

          popup = tippy("body", {
            getReferenceClientRect: props.clientRect,
            appendTo: () => document.body,
            content: component.element,
            showOnCreate: true,
            interactive: true,
            trigger: "manual",
            placement: "bottom-start",
          });
        },
        onUpdate(props) {
          component.updateProps({ ...props, variables: VARIABLES });

          popup[0].setProps({
            getReferenceClientRect: props.clientRect,
          });
        },
        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup[0].hide();
            return true;
          }
          return component.ref?.onKeyDown(props);
        },
        onExit() {
          popup[0].destroy();
          component.destroy();
        },
      };
    },
  },
});