(ns dbmon.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :refer [register-sub]]))


(register-sub
  :databases
  (fn
    [db _]
    (reaction (:databases @db))))

(register-sub
  :lastSample
  (fn
    [db [_ dbname]]
    (let [databases (reaction (:databases @db))
          db (reaction (first (filter #(= dbname (get % "dbname")) @databases)))]
        (reaction (get @db "lastSample")))))

(register-sub
  :nbQueries
  (fn
    [db [_ dbname]]
    (let [databases (reaction (:databases @db))
          db (reaction (first (filter #(= dbname (get % "dbname")) @databases)))
          lastSample (reaction (get @db "lastSample"))]
        (reaction (get @lastSample "nbQueries")))))

(register-sub
  :topFiveQueries
  (fn
    [db [_ dbname]]
    (let [databases (reaction (:databases @db))
          db (reaction (first (filter #(= dbname (get % "dbname")) @databases)))
          lastSample (reaction (get @db "lastSample"))]
      (reaction (get @lastSample "topFiveQueries")))))
