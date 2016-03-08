(ns dbmon.handlers
  (:require [re-frame.core :refer [register-handler]]
    [re-frame.middleware :refer [debug]]
    [dbmon.db :refer [initial-state]]))

(def standard-middlewares (if ^boolean goog.DEBUG
                            debug))

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
    (assoc db :databases databases)))
