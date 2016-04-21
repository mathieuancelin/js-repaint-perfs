(ns dbmon.handlers
  (:require [re-frame.core :refer [register-handler]]
    [re-frame.middleware :refer [debug]]
    [dbmon.db :refer [initial-state]]))

(def standard-middlewares (if ^boolean goog.DEBUG
                            debug))

(defn extract-query
  [query]
  {"query" (.-query query)
    "formatElapsed" (.-formatElapsed query)
    "elapsedClassName" (.-elapsedClassName query)})

(defn extract-database
  [database]
  (let [lastSample (.-lastSample database)
        topFiveQueries (map extract-query (.-topFiveQueries lastSample))]
    {"dbname" (.-dbname database)
     "lastSample" {"countClassName" (.-countClassName lastSample)
                    "nbQueries" (.-nbQueries lastSample)
                    "topFiveQueries" topFiveQueries}}))

;; handlers handle dispatched events
(register-handler
  :init-db
  ;standard-middlewares
  (fn
    [db [_ args]]
    (merge db initial-state)))

(register-handler
  :sample
  ;standard-middlewares
  (fn
    [db [_ databases]]
    (let [dbs (map extract-database databases)]
      (assoc db :databases dbs))))
