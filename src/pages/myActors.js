import MyActorsHeader from "../components/myActor/myActorHeader";
// import ActorsCollection from "../components/shared/collectionActors";
// import { useMyActorsContext } from "../context/myActorsContext";

export default function MyActors() {

    return (
        <div className="sm:pt-32  sm:px-20 px-3  pb-20">
            <MyActorsHeader></MyActorsHeader>
            {/* <ActorsCollection actors={myActors}></ActorsCollection> */}
        </div>
    )
}