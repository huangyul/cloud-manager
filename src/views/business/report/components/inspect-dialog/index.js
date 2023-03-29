import { render, createVNode } from "vue";
import InspectDialog from "./index.vue";

const createMount = () => {
  const destory = () => {
    const timer = setTimeout(() => {
      render(null, container);
      document.body.removeChild(container);
      clearTimeout(timer);
    }, 500);
  };
  const container = document.createElement("div");
  const vm = createVNode(InspectDialog, {
    destory,
  });
  render(vm, container);
  document.body.appendChild(container);
};

function InspectDialogCortral() {
  return createMount();
}

InspectDialogCortral.install = (app) => {
  app.component("InspectDialog", InspectDialog);
};

export default InspectDialogCortral;
