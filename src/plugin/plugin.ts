import { PLUGIN, UI } from "@common/networkSides";
import { PLUGIN_CHANNEL } from "@plugin/plugin.network";
import { Networker } from "monorepo-networker";

async function bootstrap() {
  Networker.initialize(PLUGIN, PLUGIN_CHANNEL);

  if (figma.editorType === "figma") {
    figma.showUI(__html__, {
      width: 400,
      height: 560, // UI height so total = 600px including Figma header
      title: "",
    });
  } else if (figma.editorType === "figjam") {
    figma.showUI(__html__, {
      width: 400,
      height: 560, // Same here
      title: "",
    });
  }

  console.log("Bootstrapped @", Networker.getCurrentSide().name);

  PLUGIN_CHANNEL.emit(UI, "hello", ["Hey there, UI!"]);

  setInterval(() => PLUGIN_CHANNEL.emit(UI, "ping", []), 5000);

  // Optional: Handle navigation if needed from plugin side
  figma.ui.onmessage = (msg) => {
    if (msg.type === "navigate") {
      figma.ui.postMessage({ pluginMessage: { type: "navigate", view: msg.view } });
    }
  };
}

bootstrap();