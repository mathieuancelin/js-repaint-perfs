(ns dbmon.views
  (:require [re-frame.core :refer [dispatch dispatch-sync subscribe]]))

(defn query
  [props]
  (let [elapsedClassName (:elapsedClassName props)
        formatElapsed (:formatElapsed props)
        query (:query props)
        key (:key props)]
      [:td {:key key :class elapsedClassName}
        formatElapsed
        [:div {:class "popover left"}
          [:div {:class "popover-content"} query]
          [:div {:class "arrow"}]]]))

(defn database
  [props db]
  (let [dbname (:key props)
        lastSample (subscribe [:lastSample dbname])
        nbQueries (subscribe [:nbQueries dbname])
        topFiveQueries (subscribe [:topFiveQueries dbname])]
    (fn []
      [:tr {:key dbname}
        [:td {:class "dbname"} dbname]
        [:td {:class "query-count"}
          [:span {:class (get @lastSample "countClassName")} @nbQueries]]
        (map-indexed (fn [index q]
                      [query {:key index :query (get q "query")
                              :formatElapsed (get q "formatElapsed")
                              :elapsedClassName (get q "elapsedClassName")}]) @topFiveQueries)])))


(defn dbmon
  []
  (let [databases (subscribe [:databases])]
    (fn dbmon-component
      []
      [:div
        [:table {:class "table table-striped latest-data"}
          [:tbody
            (for [db @databases]
              [database {:key (get db "dbname")} db])]]])))

(defn app-component
  []
  [:div
    [dbmon]])
