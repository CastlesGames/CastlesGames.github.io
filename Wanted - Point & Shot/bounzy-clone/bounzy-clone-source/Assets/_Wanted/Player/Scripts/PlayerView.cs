using MovementEffects;
using UnityEngine;
using UnityEngine.UI;

public class PlayerView : MonoBehaviour
{
    [SerializeField]
    Text _damageBulletText;

    [SerializeField]
    Text _lifeText;

    [SerializeField]
    Slider _lifeSlider;

    [SerializeField]
    Transform _endTurnButton;

    [SerializeField]
    ParticleSystem _bloodParticleSystem;

    [SerializeField]
    ParticleSystem _shotParticleSystem;

    [SerializeField]
    Animator _animator;

    [SerializeField]
    Player _player;

    [SerializeField]
    PlayerController _playerController;

    //public event System.Action OnEndTurn;

    // Start is called before the first frame update
    void Awake()
    {
        _player.OnInitialized += Player_OnInitialized;
        _player.OnChangeLife += Player_OnChangeLife;
        _playerController.OnInstantiateBullets += PlayerController_OnInstantiateBullets;
        _playerController.OnFinishShot += PlayerController_OnFinishShot;
        _playerController.OnShot += PlayerController_OnShot;
    }

    private void OnDestroy()
    {
        _player.OnInitialized -= Player_OnInitialized;
        _player.OnChangeLife -= Player_OnChangeLife;
        _playerController.OnInstantiateBullets -= PlayerController_OnInstantiateBullets;
        _playerController.OnFinishShot -= PlayerController_OnFinishShot;
        _playerController.OnShot -= PlayerController_OnShot;
    }

    private void PlayerController_OnShot()
    {
        _animator.Play("@shot");
        _shotParticleSystem.gameObject.SetActive(true);
        _shotParticleSystem.Play();
    }

    private void PlayerController_OnFinishShot(){
        _endTurnButton.gameObject.SetActive(false);
    }

    private void PlayerController_OnInstantiateBullets(){
        _endTurnButton.gameObject.SetActive(true);
    }

    private void Player_OnInitialized(float life, float damageBullet){
        Initialized(life, damageBullet);
    }

    private void Player_OnChangeLife(float life){
        UpdateInfo(life);
    }

    void Initialized(float life, float damageBullet)
    {
        _damageBulletText.text = damageBullet.ToString();
        _lifeText.text = life.ToString();
        _lifeSlider.maxValue = life;
        _lifeSlider.value = life;
        _endTurnButton.gameObject.SetActive(false);
    }

    void UpdateInfo(float life){
        _lifeText.text = life.ToString();
        _lifeSlider.value = life;
        _bloodParticleSystem.gameObject.SetActive(true);
        _bloodParticleSystem.Play();
    }

    //public void EndTurn(){
    //    if (OnEndTurn != null) OnEndTurn();
    //}
}
