using PlayFab.ClientModels;
using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class SampleScene : MonoBehaviour
{
    private int _entries = 0;
    private bool _canLoadMoreEntries = true;
    private FacebookAndPlayFabManager _facebookAndPlayFabManager;
    private ScrollRect _scrollRect;
    private Sprite _defaultFacebookSprite;

    [Header("Login section screen objects")]
    public Image profilePicture;
    public Text userName;
    public Text loginButtonText;

    [Space(10)]
    [Header("Leaderboard section screen objects")]
    public GameObject leaderboardPanel;
    public Slider filterSlider;
    public LeaderboardEntry entryPrefab;
    public Transform leaderboardEntryParent;
    public GameObject messagePanel;
    public Scrollbar leaderboardScrollbar;

    [Space(10)]
    [Header("Leaderboard parameters")]
    public int maxResultsCount;

    private void Start()
    {
        _facebookAndPlayFabManager = FacebookAndPlayFabManager.Instance;
        _defaultFacebookSprite = profilePicture.sprite;
        _scrollRect = leaderboardEntryParent.GetComponentInParent<ScrollRect>();
    }

    public void FacebookLogin()
    {
        if (string.IsNullOrEmpty(_facebookAndPlayFabManager.playFabTitleId))
        {
            Debug.LogError("PlayFab Title Id is null.");
            return;
        }

        if (_facebookAndPlayFabManager.IsLoggedOnFacebook)
        {
            _facebookAndPlayFabManager.LogOutFacebook();
            profilePicture.sprite = _defaultFacebookSprite;
            userName.text = "Your name";
            loginButtonText.text = "LOGIN";
            ClearLeaderboard();
            leaderboardPanel.SetActive(false);
            return;
        }

        _facebookAndPlayFabManager.LogOnFacebook(res =>
        {
            StartCoroutine(WaitForPlayFabLoginCoroutine());
            StartCoroutine(WaitForUserNameCoroutine());
            StartCoroutine(WaitForProfilePictureCoroutine());
        });
    }

    private IEnumerator WaitForPlayFabLoginCoroutine()
    {
        yield return new WaitUntil(() => _facebookAndPlayFabManager.IsLoggedOnPlayFab);
        FacebookAndPlayFabManager.Instance.UpdateStat(PlayFabStatConstants.Test, 6);
        GetLeaderboard(PlayFabStatConstants.Test, filterSlider.value == 0, 0);
    }

    private IEnumerator WaitForUserNameCoroutine()
    {
        yield return new WaitUntil(() => !string.IsNullOrEmpty(_facebookAndPlayFabManager.FacebookUserName));

        userName.text = _facebookAndPlayFabManager.FacebookUserName;
        loginButtonText.text = "LOGOUT";
    }

    private IEnumerator WaitForProfilePictureCoroutine()
    {
        yield return new WaitUntil(() => _facebookAndPlayFabManager.FacebookUserPictureSprite != null);

        profilePicture.sprite = _facebookAndPlayFabManager.FacebookUserPictureSprite;
    }

    public void GetLeaderboard(string statisticName, bool friendsOnly, int startPosition)
    {
        _scrollRect.vertical = false;
        messagePanel.SetActive(true);
        _facebookAndPlayFabManager.GetLeaderboard(statisticName, friendsOnly, maxResultsCount, GetLeaderboardCallback, startPosition);
    }

    public void GetLeaderboardCallback(GetLeaderboardResult result)
    {
        _scrollRect.vertical = true;
        messagePanel.SetActive(false);
        filterSlider.interactable = true;
        leaderboardPanel.SetActive(true);

        if (result.Leaderboard.Count < maxResultsCount)
            _canLoadMoreEntries = false;

        foreach (PlayerLeaderboardEntry playerEntry in result.Leaderboard)
        {
            LeaderboardEntry entry = Instantiate(entryPrefab.gameObject, leaderboardEntryParent).GetComponent<LeaderboardEntry>();

            int width = 100;
            int height = 100;

            entry.SetUserPosition(playerEntry.Position + 1);
            entry.SetUserScore(playerEntry.StatValue);

            if (playerEntry.DisplayName == _facebookAndPlayFabManager.FacebookUserId)
            {
                entry.SetUserName(_facebookAndPlayFabManager.FacebookUserName);
                entry.SetUserPictureSprite(_facebookAndPlayFabManager.FacebookUserPictureSprite);
            }
            else
            {
                _facebookAndPlayFabManager.GetFacebookUserName(playerEntry.DisplayName, res =>
                {
                    entry.SetUserName(res.ResultDictionary["name"].ToString());
                });

                _facebookAndPlayFabManager.GetFacebookUserPicture(playerEntry.DisplayName, width, height, res =>
                {
                    entry.SetUserPictureSprite(Sprite.Create(res.Texture, new Rect(0, 0, width, height), Vector2.zero));
                });

                // ATTENTION:
                // If you're having trouble getting the profile picture please comment the call above and uncomment the following.

                //_facebookAndPlayFabManager.GetFacebookUserPictureFromUrl(playerEntry.DisplayName, width, height, res =>
                //{
                //    StartCoroutine(_facebookAndPlayFabManager.GetTextureFromGraphResult(res, tex =>
                //    {
                //        entry.SetUserPictureSprite(Sprite.Create(tex, new Rect(0, 0, width, height), Vector2.zero));
                //    }));
                //});
            }

            _entries++;
        }
    }

    public void ClearLeaderboard()
    {
        for (int i = 0; i < leaderboardEntryParent.childCount; i++)
        {
            Destroy(leaderboardEntryParent.GetChild(i).gameObject);
        }
    }

    public void OnScrollbarValueChanged()
    {
        if (leaderboardScrollbar.value == 0)
        {
            if (_canLoadMoreEntries)
                GetLeaderboard(PlayFabStatConstants.Test, filterSlider.value == 0, _entries);
        }
    }

    public void OnFilterChanged()
    {
        if (!_facebookAndPlayFabManager.IsLoggedOnPlayFab)
            return;

        ClearLeaderboard();

        filterSlider.interactable = false;

        GetLeaderboard(PlayFabStatConstants.Test, filterSlider.value == 0, 0);
    }

    public void FacebookShare()
    {
        _facebookAndPlayFabManager.ShareOnFacebook();
    }

    public void FacebookInvite()
    {
        _facebookAndPlayFabManager.InviteOnFacebook();
    }
}
