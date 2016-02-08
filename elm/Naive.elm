module Naive (..) where

import Effects
import Task
import Html exposing (div, span, table, tbody, tr, td, text)
import Html.Attributes exposing (class)
import StartApp


type alias Query =
  { elapsedClassName : String
  , formatElapsed : String
  , query : String
  }


type alias LastSample =
  { countClassName : String
  , nbQueries : Int
  , topFiveQueries : List Query
  }


type alias Database =
  { dbname : String
  , lastSample : LastSample
  }


type alias Model =
  List Database


initialModel : Model
initialModel =
  []


type Action
  = LoadData Model


update : Action -> Model -> ( Model, Effects.Effects Action )
update action model =
  case action of
    LoadData model ->
      ( model, Effects.none )


viewTopFiveQueries : Query -> Html.Html
viewTopFiveQueries query =
  td
    [ class ("Query " ++ query.elapsedClassName) ]
    [ text query.formatElapsed
    , div
        [ class "popover left" ]
        [ div
            [ class "popover-content" ]
            [ text query.query ]
        , div
            [ class "arrow" ]
            []
        ]
    ]


viewDatabase : Database -> Html.Html
viewDatabase database =
  tr
    []
    ([ td
        [ class "dbname" ]
        [ text database.dbname ]
     , td
        [ class "query-count" ]
        [ span
            [ class database.lastSample.countClassName ]
            [ text (toString database.lastSample.nbQueries) ]
        ]
     ]
      ++ (List.map viewTopFiveQueries database.lastSample.topFiveQueries)
    )


view : Signal.Address Action -> Model -> Html.Html
view address model =
  div
    []
    [ table
        [ class "table table-striped latest-data" ]
        [ tbody
            []
            (List.map viewDatabase model)
        ]
    ]


actions : List (Signal Action)
actions =
  [ Signal.map LoadData dispatchGenerateData ]


app : StartApp.App Model
app =
  StartApp.start
    { init = ( initialModel, Effects.none )
    , update = update
    , view = view
    , inputs = actions
    }


main : Signal Html.Html
main =
  app.html


port tasks : Signal (Task.Task Effects.Never ())
port tasks =
  app.tasks


port dispatchGenerateData : Signal Model
