(ns dbmon.core
  (:require [reagent.core :as reagent :refer [atom render-component]]
            [re-frame.core :refer [dispatch-sync dispatch]]
            [dbmon.subs]
            [dbmon.handlers]
            [dbmon.views :refer [app-component]]))

;;(enable-console-print!)

;;(println "Edits to this text should show up in your developer console.")

(defn loadSamples
  []
  (let [jsdata (.toArray (.generateData js/ENV true))]
    (.ping js/Monitoring.renderRate)
    (dispatch [:sample jsdata])
    (.setTimeout js/window loadSamples (.-timeout js/ENV))))

(defn ^:export run ;; ^:export exposes this to javascript
  []
  (dispatch-sync [:init-db])
  (.setTimeout js/window loadSamples (.-timeout js/ENV))
  (render-component [app-component]
                    (. js/document (getElementById "app"))))

(defonce run-main
  (do
    (run)))

(defn on-js-reload [])
  ;; optionally touch your app-state to force rerendering depending on
  ;; your application
  ;; (swap! app-state update-in [:__figwheel_counter] inc)
