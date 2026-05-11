import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <h3 className="loading__title">Идет загрузка ...</h3>
      <p className="loading__desc">Пожалуйста, подождите</p>
      <span className="loadnig__animation"></span>
    </div>
  );
}
