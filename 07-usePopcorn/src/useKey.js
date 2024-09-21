import { useState, useEffect } from "react";

export function useKey(key, actionFunc) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.code.toLowerCase() == key.toLowerCase()) {
          actionFunc?.();
        }
      }
      document.addEventListener("keydown", callBack);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [actionFunc, key]
  );
}
